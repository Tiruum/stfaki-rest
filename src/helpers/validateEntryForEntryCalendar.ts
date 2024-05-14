import { HttpException, HttpStatus } from "@nestjs/common";

interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    balance: number,
    banned: boolean,
    banReason: string | null,
}

interface Entry {
    id: number,
    from: Date,
    to: Date,
    title: string,
    description: string,
    color: string,
    type: string,
    userId: number,
    userInfo: User
}

function range(start: number, end: number): number[] {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
};

function getEmptySpace(todayEntries: Entry[]): number[] {
    let emptySpace = Array(24*60).fill(0).map((element, index) => index) // счет начинается с нуля, поэтому не вычитаю единицу
    todayEntries.forEach(function(entry: Entry){
        emptySpace = emptySpace.filter(x => !range(timeToMinutes(entry.from.toJSON().slice(11, 16)), timeToMinutes(entry.to.toJSON().slice(11, 16))).includes(x))
        emptySpace.push(timeToMinutes(entry.from.toJSON().slice(11, 16)), timeToMinutes(entry.to.toJSON().slice(11, 16))) // Здесь я включаю границу множества, чтобы можно было, например, начинать запись с 05:00, если предыдущая запись закончилась в 05:00
    });
    return emptySpace;
};

function timeToMinutes(time: string): number {
    return Number(time.slice(0, 2))*60+Number(time.slice(3, 5))
}

export default function validateEntryForEntryCalendar(calendarData: Entry[], form: Entry) {
    form.title = form.title.replace(/\s{1,}/gmi, " ")
    form.description = form.description.replace(/\s{1,}/gmi, " ")
    const start_time = timeToMinutes(form.from.toJSON().slice(11, 16))
    const end_time = timeToMinutes(form.to.toJSON().slice(11, 16))
    
    if ((form.title.length > 25) || (form.description.length > 50)) throw new HttpException("Нельзя делать названия слишком длинными", HttpStatus.BAD_REQUEST)
    if (/[%\\'"]/.test(form.title) || /[%\\'"]/.test(form.description)) throw new HttpException("Недопустимые литералы в названии или описании", HttpStatus.BAD_REQUEST)
    if (form.from.toJSON().slice(0, 10) !== form.to.toJSON().slice(0, 10)) throw new HttpException("Пока что можно бронировать комнату в пределах одного дня", HttpStatus.BAD_REQUEST)
    if (start_time >= end_time) throw new HttpException("Ошибка в задании времени", HttpStatus.BAD_REQUEST)
    if (end_time - start_time < 10) throw new HttpException("Нельзя делать записи короче 10 минут", HttpStatus.BAD_REQUEST)
    
    let todayEntries = calendarData.filter(entry => entry.from.toJSON().slice(0, 10) === form.from.toJSON().slice(0, 10)) // Записи на выбранную дату
    if (todayEntries) {
        let emptySpace = [] as number[]
        Array.isArray(todayEntries) ? emptySpace = getEmptySpace(todayEntries) : emptySpace = getEmptySpace([todayEntries])
        console.log('\n\n\n\n' + emptySpace)
        console.log('\n\n\n\n' + range(start_time, end_time).sort().join(','))
        console.log('\n\n\n\n' + emptySpace.filter(x => range(start_time, end_time).includes(x)).sort().join(','))
        if (range(start_time, end_time).sort().join(',') === emptySpace.filter(x => range(start_time, end_time).includes(x)).sort().join(',')) {
            return true
        } else {
            throw new HttpException("Записи перекрывают друг друга", HttpStatus.BAD_REQUEST)
        }
    }
}