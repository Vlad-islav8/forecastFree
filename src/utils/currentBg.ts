import day1 from '../img/landscape/day1.jpg'
import day2 from '../img/landscape/day2.jpg'
import evening1 from '../img/landscape/evening1.jpg'
import evening2 from '../img/landscape/evening2.jpg'
import night1 from '../img/landscape/night1.jpg'
import night2 from '../img/landscape/night2.jpg'
import morning1 from '../img/landscape/morning1.jpg'
import morning2 from '../img/landscape/morning2.jpg'

type currentBgType = (hour:number) => string

const currentBg:currentBgType = (hour:number) => {
    const randomCurrent:number = Math.round(Math.random() * 10)
 
    if(hour >= 6 && hour <= 12) {
        if(randomCurrent > 5) {
            return evening1
        } else if(randomCurrent < 5) {
            return evening2
        }
    }
    if(hour >= 12 && hour <= 18) {
        if(randomCurrent > 5) {
            return day1
        } else if(randomCurrent < 5) {
            return day2
        }
    }
    if(hour >= 18 && hour <= 24) {
        if(randomCurrent > 5) {
            return morning1
        } else if(randomCurrent < 5) {
            return morning2
        }
    }
    if(hour >= 0 && hour <= 6) {
        if(randomCurrent > 5) {
            return night1
        } else if(randomCurrent < 5) {
            return night2
        }
    } 
    return ''
}

export default currentBg