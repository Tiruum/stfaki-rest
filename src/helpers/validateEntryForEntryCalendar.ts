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

function range(start: string, end: string): number[] {
    var ans = [];
    for (let i = Number(start.slice(0, 2)); i <= Number(end.slice(0, 2)); i++) {
        ans.push(i);
    }
    return ans;
};

function timeToNum(time: string): number {
    return Number(time.slice(0, 2))
};

function getEmptySpace(todayEntries: Entry[]): number[] {
    let emptySpace = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    todayEntries.forEach(function(entry: Entry){
        emptySpace = emptySpace.filter(x => !range(entry.from.toJSON().slice(11, 16), entry.to.toJSON().slice(11, 16)).includes(x))
        
        
        emptySpace.push(timeToNum(entry.from.toJSON().slice(11, 16)), timeToNum(entry.to.toJSON().slice(11, 16))) // Здесь я включаю границу множества, чтобы можно было, например, начинать запись с 05:00,
        // если предыдущая запись закончилась в 05:00
        
    });
    return emptySpace;
};

export default function validateEntryForEntryCalendar(calendarData: Entry[], form: Entry) {
    if (form.from.toJSON().slice(0, 10) === form.to.toJSON().slice(0, 10)) { // Если даты равны
        if ( Number(form.to.toJSON().slice(11, 13))-Number(form.from.toJSON().slice(11, 13)) <= 6 && Number(form.to.toJSON().slice(11, 13)) > Number(form.from.toJSON().slice(11, 13)) && Number(form.from.toJSON().slice(11, 13)) >= 0 && Number(form.to.toJSON().slice(11, 13)) <= 23 ) {
            let todayEntries = calendarData.filter(entry => entry.from.toJSON().slice(0, 10) === form.from.toJSON().slice(0, 10)) // Записи на выбранную дату
            if (todayEntries) {
                let emptySpace = [] as number[]
                Array.isArray(todayEntries) ? emptySpace = getEmptySpace(todayEntries) : emptySpace = getEmptySpace([todayEntries])
                if (range(form.from.toJSON().slice(11, 16), form.to.toJSON().slice(11, 16)).sort().join(',') === emptySpace.filter(x => range(form.from.toJSON().slice(11, 16), form.to.toJSON().slice(11, 16)).includes(x)).sort().join(',')) {
                    return true
                } else {
                    throw new HttpException("Записи перекрывают друг друга", HttpStatus.BAD_REQUEST)
                }
            }
        } else {
            throw new HttpException("Нельзя делать бронь дольше 6 часов или равной нулю", HttpStatus.BAD_REQUEST)
        }
    } else {
        throw new HttpException("Пока что можно бронировать комнату в пределах одного дня", HttpStatus.BAD_REQUEST)
    }
}