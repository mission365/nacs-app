// Enhanced Interactive Animations
document.addEventListener("DOMContentLoaded", () => {
  // Initialize form animations
  initializeFormAnimations()

  // Add interactive effects
  addInteractiveEffects()

  // Add colorful focus effects
  addColorfulFocusEffects()

  // Add button ripple effects
  addButtonRippleEffects()

  // Add floating label effects
  addFloatingLabelEffects()
})

function initializeFormAnimations() {
  // Stagger form row animations
  const formRows = document.querySelectorAll(".form-row")
  formRows.forEach((row, index) => {
    row.style.animationDelay = `${0.1 * (index + 1)}s`
  })

  // Add entrance animations to input groups
  const inputGroups = document.querySelectorAll(".input-group")
  inputGroups.forEach((group, index) => {
    group.style.animation = `slideInLeft 0.6s ease-out ${0.05 * index}s both`
  })
}

function addInteractiveEffects() {
  const inputs = document.querySelectorAll("input, select, textarea")

  inputs.forEach((input) => {
    // Focus animations
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
      createFocusRipple(this)
    })

    // Blur animations
    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused")
    })

    // Input change animations
    input.addEventListener("input", function () {
      if (this.value) {
        this.classList.add("has-value")
      } else {
        this.classList.remove("has-value")
      }
    })
  })
}

function addColorfulFocusEffects() {
  const inputs = document.querySelectorAll(".form-input, .form-select, .form-textarea")
  const colors = [
    "rgba(255, 107, 107, 0.2)",
    "rgba(78, 205, 196, 0.2)",
    "rgba(69, 183, 209, 0.2)",
    "rgba(150, 206, 180, 0.2)",
    "rgba(254, 202, 87, 0.2)",
    "rgba(255, 159, 243, 0.2)",
    "rgba(84, 160, 255, 0.2)",
  ]

  inputs.forEach((input, index) => {
    const colorIndex = index % colors.length

    input.addEventListener("focus", function () {
      this.style.boxShadow = `0 0 0 3px ${colors[colorIndex]}, 0 0 20px ${colors[colorIndex]}`
    })

    input.addEventListener("blur", function () {
      this.style.boxShadow = ""
    })
  })
}

function addButtonRippleEffects() {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = this.querySelector(".btn-ripple")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"

      // Trigger ripple animation
      ripple.style.width = ripple.style.height = size * 2 + "px"

      setTimeout(() => {
        ripple.style.width = ripple.style.height = "0px"
      }, 600)
    })
  })
}

function addFloatingLabelEffects() {
  const inputGroups = document.querySelectorAll(".input-group")

  inputGroups.forEach((group) => {
    const input = group.querySelector("input, select, textarea")
    const label = group.querySelector(".input-label")

    if (input && label) {
      input.addEventListener("focus", () => {
        label.style.transform = "translateY(-2px) scale(0.95)"
        label.style.color = "#3b82f6"
      })

      input.addEventListener("blur", function () {
        if (!this.value) {
          label.style.transform = ""
          label.style.color = ""
        }
      })
    }
  })
}

function createFocusRipple(element) {
  const ripple = document.createElement("div")
  ripple.className = "focus-ripple"
  ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: focusRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `

  element.parentElement.style.position = "relative"
  element.parentElement.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Add CSS for additional animations
const additionalStyles = `
    @keyframes slideInLeft {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes focusRipple {
        from {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    .focused {
        transform: translateY(-2px) scale(1.02) !important;
    }
    
    .has-value {
        background: rgba(59, 130, 246, 0.05) !important;
    }
`

// Inject additional styles
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

// Add particle interaction
document.addEventListener("mousemove", (e) => {
  const particles = document.querySelectorAll(".particle")
  const mouseX = e.clientX
  const mouseY = e.clientY

  particles.forEach((particle, index) => {
    const rect = particle.getBoundingClientRect()
    const particleX = rect.left + rect.width / 2
    const particleY = rect.top + rect.height / 2

    const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2))

    if (distance < 100) {
      const angle = Math.atan2(mouseY - particleY, mouseX - particleX)
      const force = (100 - distance) / 100
      const moveX = Math.cos(angle) * force * 20
      const moveY = Math.sin(angle) * force * 20

      particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.5})`
    } else {
      particle.style.transform = ""
    }
  })
})
