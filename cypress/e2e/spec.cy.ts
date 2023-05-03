describe('app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be visible', () => {
    cy.get('#app').should('exist').and('be.visible')
  })

  it('should contain header', () => {
    cy.get('[data-test="header"]').should('exist').and('be.visible')
  })

  it('should contain router', () => {
    cy.get('[data-test="router"]').should('exist').and('be.visible')
  })
})

describe('header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be visible', () => {
    cy.get('[data-test="header"]').should('exist').and('be.visible')
  })

  it('should contain tabs', () => {
    cy.get('[data-test="header"] .p-tabmenu-nav').should('exist').and('be.visible')
  })

  it('should contain map tab', () => {
    cy.get('[data-test="header"] a[href="/map"]').should('exist').and('be.visible').and('contain.text', 'Карта')
  })

  it('should contain cars tab', () => {
    cy.get('[data-test="header"] a[href="/cars"]').should('exist').and('be.visible').and('contain.text', 'Автомобили')
  })
})

describe('map page', () => {
  beforeEach(() => {
    cy.visit('/map')
  })

  it('should be visible', () => {
    cy.get('.router.map-page').should('exist').and('be.visible')
  })

  it('should contain map', () => {
    cy.get('.router.map-page .mapbox-map').should('exist').and('be.visible')
  })
})

describe('cars page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://online.omnicomm.ru/ls/api/v2/tree/vehicle', { fixture: 'vehicle' }).as('getVehicle')
    cy.visit('/cars')
  })

  it('should be visible', () => {
    cy.get('.router.cars-page').should('exist').and('be.visible')
  })

  it('should contain map', () => {
    cy.get('.router.cars-page .p-datatable').should('exist').and('be.visible')
  })

  describe('when selected', () => {
    beforeEach(() => {
      cy.wait('@getVehicle')
      cy.get('.router.cars-page .p-datatable tbody tr').first().click()
    })

    it('should contain map', () => {
      cy.get('.router.cars-page .mapbox-map').should('exist').and('be.visible')
    })

    it('should contain car info', () => {
      cy.get('.router.cars-page .car-info').should('exist').and('be.visible')
    })

    it('should contain car stats', () => {
      cy.get('.router.cars-page .car-stats').should('exist').and('be.visible')
    })
  })
})
