import React, { useState } from 'react'
import Grass from './assets/grass.jpg'
import HouseImage from './assets/house.jpg'
import TreesImage from './assets/trees.jpg'
import WoodImage from './assets/wood.jpg'

function App() {
  const [currentSection, setCurrentSection] = useState('house')
  const [zoom, setZoom] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log({ x, y })
    setZoomPosition({ x, y })
    setZoom(true)
    const changeSection = (section) => {
      setTimeout(() => {
        setCurrentSection(section)
        setZoom(false)
      }, 2500)
    }
    if (x >= 0 && x <= rect.width && y >= 0 && y <= 500) {
      changeSection('trees')
    }
    if (x >= 300 && x <= rect.width && y >= 314) {
      changeSection('grass')
    }
    if (x < 299 && x <= rect.width && y >= 314) {
      changeSection('wood')
    }
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'house':
        return (
          <section
            className={`house ${zoom ? 'zoom' : ''} flex`}
            onClick={handleClick}
            style={{
              transformOrigin: `${zoomPosition.x}px ${zoomPosition.y}px`,
            }}
          >
            <div className="container-text">
              <h1 className="title">WELCOME</h1>
            </div>

            <img src={HouseImage} alt="House" />
          </section>
        )
      case 'grass':
        return (
          <section className="grass">
            <div className="container-text ">
              <h1 className="title">GRASS</h1>
              <p className="paragraph glass">
                Grass is a prevalent type of vegetation found in various
                ecosystems around the world. Characterized by its slender blades
                and lush green color, grass plays a crucial role in the
                environment. It provides essential ground cover that prevents
                soil erosion, enhances biodiversity, and supports wildlife by
                offering habitat and food sources
              </p>
            </div>
            <img src={Grass} alt="Grass" />
          </section>
        )
      case 'trees':
        return (
          <section className="trees">
            <div className="container-text ">
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

            <img src={TreesImage} alt="Trees" />
          </section>
        )
      case 'wood':
        return (
          <section className="wood">
            <div className="container-text ">
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

            <img src={WoodImage} alt="Wood" />
          </section>
        )
      default:
        return null
    }
  }

  return (
    <div className="main-container">
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
      <>{renderSection()} </>
    </div>
  )
}

export default App
