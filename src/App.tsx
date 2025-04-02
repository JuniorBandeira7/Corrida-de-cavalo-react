import { useEffect, useState } from 'react'
import horseBlack from './assets/horse-black.svg'
import horseBlue from './assets/horse-blue.svg'
import horseGreen from './assets/horse-green.svg'
import horseRed from './assets/horse-red.svg'
import horse from './assets/horse.svg'
import './App.css'

function App() {
  const [horse1, sethorse1] = useState<number>(0)
  const [horse2, sethorse2] = useState<number>(0)
  const [horse3, sethorse3] = useState<number>(0)
  const [horse4, sethorse4] = useState<number>(0)
  const [horse5, sethorse5] = useState<number>(0)
  const [winnersHorsesNames, setWinnersHorsesNames] = useState<string[]>([])
  const max = 1.2
  const min = 0.0001

  const [stop, setStop] = useState<boolean>(true)

  function getRandom(min: number, max: number) { // Peguei na documentação do js. da um numero aleatorio entre o max e o min (com esse incluso).
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    if (stop) return
    const winnersHorses: string[] = []

    const timer = setTimeout(() => {
      sethorse1(prev => {
        const newValue = prev + getRandom(max, min)
        checkWinners("preto", newValue)
        return newValue
      })

      sethorse2(prev => {
        const newValue = prev + getRandom(max, min)
        checkWinners("azul", newValue)
        return newValue
      })

      sethorse3(prev => {
        const newValue = prev + getRandom(max, min)
        checkWinners("vermelho", newValue)
        return newValue
      })

      sethorse4(prev => {
        const newValue = prev + getRandom(max, min)
        checkWinners("verde", newValue)
        return newValue
      })

      sethorse5(prev => {
        const newValue = prev + getRandom(max, min)
        checkWinners("transparente", newValue)
        return newValue
      })

      const checkWinners = (name: string, value: number) => {
        if (value >= 100) {
          winnersHorses.push(name)
          setWinnersHorsesNames(winnersHorses)
        }
      }

      const horses = [horse1, horse2, horse3, horse4, horse5]
      const winners = horses.filter(h => h >= 100)

      if (winners.length > 0) {
        setStop(true);
        if (winners.length > 1) {
          alert(`Ganhadores: ${winnersHorsesNames}`)
          return
        }
        alert(`Ganhador: ${winnersHorsesNames}`)
      }
    }, 50);
    return () => clearTimeout(timer)
  }, [horse1, horse2, horse3, horse4, horse5, stop])

  function run () {
    setStop(false)
  }

  return (
    <>
      <div id='pista'>
        <img src={horseBlack} alt="cavalo 1" style={{marginLeft: `${horse1}%`}}/>
        <img src={horseBlue} alt="cavalo 1" style={{marginLeft: `${horse2}%`}}/>
        <img src={horseRed} alt="cavalo 1" style={{marginLeft: `${horse3}%`}}/>
        <img src={horseGreen} alt="cavalo 1" style={{marginLeft: `${horse4}%`}}/>
        <img src={horse} alt="cavalo 1" style={{marginLeft: `${horse5}%`}}/>
      </div>
      <button onClick={run}>teste</button>
    </>
  )
}

export default App
