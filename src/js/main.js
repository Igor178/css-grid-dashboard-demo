new Chartist.Line(
  '.ct-chart',
  {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    series: [[1, 4, 2, 3, 1, 4]]
  },
  {
    height: 360 - 44 + 42,
    fullWidth: true,
    chartPadding: {
      left: 30,
      right: 30
    },
    showArea: true,
    // showLine: false,
    axisX: {
      showGrid: false
    },
    axisY: {
      onlyInteger: true,
      labelInterpolationFnc: function(value) {
        return '$' + value + '0' + '.000'
      }
    }
  }
)

new Chartist.Pie(
  '.ct-chart-2',
  {
    series: [40, 30, 30]
  },
  {
    height: 360 - 44,
    donut: true,
    donutWidth: 30,
    donutSolid: true,
    startAngle: 270,
    showLabel: false
  }
)

const wrapper = document.querySelector('.wrapper')
const sidebar = document.querySelector('.sidebar')
const mobileMenu = document.querySelector('.fa-bars')
const sidebarItem = document.querySelectorAll('.sidebar__item')
const sidebarDropdown = document.querySelectorAll('.sidebar__dropdown')
const sidebarLink = document.querySelectorAll('.sidebar__link')
const sidebarDropdownItem = document.querySelectorAll('.sidebar__dropdown-item')

// Active Dropdown Item
sidebarDropdownItem.forEach(item => {
  item.addEventListener('click', e => {
    if (e.target.classList.value === 'sidebar__dropdown-item') {
      sidebarDropdownItem.forEach(item =>
        item.classList.remove('sidebar__dropdown-item--active')
      )
      return e.target.classList.add('sidebar__dropdown-item--active')
    } else {
      return e.target.classList.remove('sidebar__dropdown-item--active')
    }
  })
})

// Active link
sidebarLink.forEach(item => {
  item.addEventListener('click', e => {
    if (e.target.classList.value === 'sidebar__link') {
      toggleDropdown(e)
      e.target.childNodes[2].classList.add('sidebar__icon--rotate')
      return e.target.classList.add('sidebar__link--active')
    } else {
      toggleDropdown(e)
      sidebarDropdownItem.forEach(item =>
        item.classList.remove('sidebar__dropdown-item--active')
      )
      e.target.childNodes[2].classList.remove('sidebar__icon--rotate')
      return e.target.classList.remove('sidebar__link--active')
    }
  })
})

// Toggle Dropdow
const toggleDropdown = e => {
  if (
    e.target.nextElementSibling !== null &&
    e.target.nextElementSibling.classList.value === 'sidebar__dropdown' &&
    e.target.nextElementSibling.classList.value !==
      'sidebar__dropdown sidebar__dropdown--open'
  ) {
    return e.target.nextElementSibling.classList.add('sidebar__dropdown--open')
  } else if (e.target.nextElementSibling) {
    return e.target.nextElementSibling.classList.remove(
      'sidebar__dropdown--open'
    )
  }
}

const closeSidebar = element => {
  return element.classList.add('close')
}
const openSidebar = element => {
  return element.classList.remove('close')
}

mobileMenu.addEventListener('click', () => {
  if (wrapper.classList.value === 'wrapper close') {
    openSidebar(wrapper)
  } else {
    closeSidebar(wrapper)
  }
})

const checkSidebar = x => {
  if (x.matches) {
    return
  } else {
    openSidebar(wrapper)
  }
}

const x = window.matchMedia('(max-width: 990px)')
checkSidebar(x) / x.addListener(checkSidebar)
