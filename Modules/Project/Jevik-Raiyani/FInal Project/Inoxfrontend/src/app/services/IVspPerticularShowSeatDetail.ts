export class IVspPerticularShowSeatDetail{
    showTimeId?:number
    movieId:number
    screenId:number
    date:Date
    startTime: {
        ticks?: number,
        days?: number,
        hours?: number,
        milliseconds?: number,
        minutes?: number,
        seconds?: number,
        totalDays?: number,
        totalHours?: number,
        totalMilliseconds?: number,
        totalMinutes?: number,
        totalSeconds?: number,
    }
    seatId: number
    seatNo: number
    rowId: number
    rowNo: number
    seatTypeId: number
    name: string
    price:number
    flag: number
}

