import { useState, useRef, useEffect } from 'react'
import Grass from './assets/images/grass.jpg'
import HouseImage from './assets/images/house.jpg'
import TreesImage from './assets/images/trees.jpg'
import WoodImage from './assets/images/wood.jpg'
import Sound2 from './assets/audio/house.mp3'
import door from './assets/audio/door.mp3'

import Song from './assets/images/playlist.png'
import { Canvas } from '@react-three/fiber'
import HouseExplore from './HouseExplorer'
import { CatModel } from './CatModel'
import CatExplore from './CatExplorer'
function App() {
  const [squarePosition, setSquarePosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState('house')
  const [zoom, setZoom] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)
  const doorRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)

  const handleDragStart = (e) => {
    const rect = e.target.getBoundingClientRect()
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      }),
    )
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('text/plain'))
    const containerRect = e.target.getBoundingClientRect()
    const x = e.clientX - containerRect.left - data.offsetX
    const y = e.clientY - containerRect.top - data.offsetY

    setSquarePosition({
      x: Math.max(0, Math.min(containerRect.width - 50, x)),
      y: Math.max(0, Math.min(containerRect.height - 50, y)),
    })
  }

  const playSound = () => {
    audioRef.current.volume = 0.3
    audioRef.current.play()
  }
  const handlePlay = () => {
    setIsPlaying(true)
    playSound()
  }

  const handlePause = () => {
    setIsPlaying(false)
    audioRef.current.pause()
  }

  const handleNext = () => {
    // Lógica para reproducir la siguiente canción
  }

  const handlePrevious = () => {
    // Lógica para reproducir la canción anterior
  }

  const handleProgressChange = (event) => {
    const value = event.target.value
    setProgress(value)
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration
  }

  const updateProgress = () => {
    const currentTime = audioRef.current.currentTime
    const duration = audioRef.current.duration
    if (duration > 0) {
      setProgress((currentTime / duration) * 100)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    audio.addEventListener('timeupdate', updateProgress)
    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
    }
  }, [])
  const handleClick = (event) => {
    handlePause()
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log({ x, y })
    setZoomPosition({ x, y })

    /*   setZoom(true) */

    const changeSection = (section) => {
      if (section !== 'model') {
        setZoom(true)
      }

      setTimeout(() => {
        setCurrentSection(section)
        if (section !== 'model') {
          setZoom(true)
        }
      }, 2500)
    }
    if (x >= 0 && x <= rect.width && y >= 0 && y <= 500) {
      changeSection('trees')
    } else if (x >= 300 && x <= rect.width && y >= 314) {
      changeSection('model')
      doorRef.current.play()
    } else if (x < 299 && y >= 314) {
      changeSection('wood')
    } else if (x >= 191 && x <= 1005 && y >= 41 && y <= 709) {
      // Nueva condición
      changeSection('model') // Cambia 'model' por la sección que desees
    }
  }

  const renderSection = () => {
    const baseClass = `${currentSection} ${zoom ? 'zoom' : ''} flex`
    switch (currentSection) {
      case 'house':
        return (
          <section
            className={baseClass}
            onClick={handleClick}
            style={{
              transformOrigin: `${zoomPosition.x}px ${zoomPosition.y}px`,
            }}
          >
            <div className="container-text">
              <h1 className="title">WELCOME</h1>
            </div>
            <img src={HouseImage} alt="House" className="bg-section" />
          </section>
        )
      case 'model':
        return (
          <section>
            <Canvas>
              <HouseExplore />
              <CatExplore />
            </Canvas>
          </section>
        )
      case 'grass':
        return (
          <section className={baseClass}>
            <div className="container-text">
              <h1 className="title">GRASS</h1>
              <p className="paragraph glass">
                Grass is a prevalent type of vegetation found in various
                ecosystems around the world. Characterized by its slender blades
                and lush green color, grass plays a crucial role in the
                environment. It provides essential ground cover that prevents
                soil erosion, enhances biodiversity, and supports wildlife by
                offering habitat and food sources.
              </p>
            </div>
            <img src={Grass} alt="Grass" className="bg-section" />
          </section>
        )
      case 'trees':
        return (
          <section className={baseClass}>
            <div className="container-text">
              <h1 className="title">TREES</h1>
              <p className="paragraph glass">
                Trees in the mountains play a vital role in maintaining the
                ecosystem and enhancing the beauty of the landscape. They
                provide essential habitats for various wildlife, including
                birds, mammals, and insects. The diverse range of tree species,
                from towering pines to resilient oaks, contributes to the unique
                character of mountainous regions.
              </p>
            </div>
            <img src={TreesImage} alt="Trees" className="bg-section" />
          </section>
        )
      case 'wood':
        return (
          <section className={baseClass}>
            <div className="container-text">
              <h1 className="title">WOOD</h1>
              <p className="paragraph glass">
                Wood from mountainous regions is an essential resource that has
                been utilized for centuries. The unique climate and diverse
                ecosystems of these areas produce various tree species, each
                offering distinct qualities. For instance, pine and fir are
                commonly found in higher elevations, known for their durability
                and resistance to harsh weather conditions. This makes them
                ideal for construction, particularly in building cabins and
                shelters that blend harmoniously with the natural landscape.
              </p>
            </div>
            <img src={WoodImage} alt="Wood" className="bg-section" />
          </section>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="main-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {currentSection === 'house' && (
        <div
          id="draggable"
          draggable="true"
          onDragStart={handleDragStart}
          className="absolute glass"
          style={{
            zIndex: 10,
            padding: '0.5rem 0.5rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1rem',
            fontWeight: 'bolder',
            color: 'white',
            left: `${squarePosition.x}px`,
            top: `${squarePosition.y}px`,
          }}
        >
          <div
            style={{
              borderRadius: '13px',
              overflow: 'hidden',
              height: '70px',
            }}
          >
            <img src={Song} alt="" style={{ height: '100%', width: '100%' }} />
          </div>
          <div>
            <h2 style={{ margin: 0 }} className="audio-title">
              {' '}
              Cinematic Dramatic{' '}
            </h2>
            <p style={{ margin: 0 }} className="audio-author">
              <span>Unknown</span>
            </p>
            <div>
              <button className="play" onClick={handlePrevious}>
                ◀︎
              </button>
              {isPlaying !== false ? (
                <button className="play" onClick={handlePause}>
                  ❚❚
                </button>
              ) : (
                <button className="play" onClick={handlePlay}>
                  ▶︎
                </button>
              )}
              <button className="play" onClick={handleNext}>
                ▶︎▶︎
              </button>
            </div>
            <input
              type="range"
              value={progress}
              onChange={handleProgressChange}
              onMouseUp={updateProgress}
              style={{ width: '100%' }}
            />
          </div>
          <audio
            ref={audioRef}
            src={Sound2}
            loop
            onTimeUpdate={updateProgress}
          />
        </div>
      )}

      {currentSection !== 'house' && (
        <button
          className="back-to-home glass"
          onClick={() => {
            setCurrentSection('house')
            setZoom(false)
          }}
        >
          Back to home
        </button>
      )}
      {renderSection()}
      <audio ref={audioRef} src={Sound2} />
      <audio ref={doorRef} src={door} />
    </div>
  )
}

export default App
