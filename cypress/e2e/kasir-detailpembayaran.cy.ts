describe('Kasir', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000/kasir/detail-pembayaran');
    })

    it('displays the header correctly', () => {
        cy.get('[data-testid=title]').should('contain', 'DETAIL PEMBAYARAN');
    });

    it('displays the meidicine table correctly', () => {
        cy.get('[data-testid=table-medicine]').should('exist');
        cy.get('[data-testid=table-medicine] thead tr').within(() => {
            cy.get('th').should('have.length', 6);
            cy.get('th').eq(0).should('contain', 'No');
            cy.get('th').eq(1).should('contain', 'Obat');
            cy.get('th').eq(2).should('contain', 'Qyt');
            cy.get('th').eq(3).should('contain', 'Harga Persatuan');
            cy.get('th').eq(4).should('contain', 'Total');
            cy.get('th').eq(5).should('contain', 'Keterangan');
        });
    });

    it('displays the action table correctly', () => {
        cy.get('[data-testid=table-action]').should('exist');
        cy.get('[data-testid=table-action] thead tr').within(() => {
            cy.get('th').should('have.length', 3);
            cy.get('th').eq(0).should('contain', 'No');
            cy.get('th').eq(1).should('contain', 'Tindakan');
            cy.get('th').eq(2).should('contain', 'Harga');
        });
    });

    it('displays the total correctly', () => {
        // cy.get('[data-testid=total-item]').should('contain', 'Items (20 Qyt)');
        // cy.get('[data-testid=total-tax]').should('contain', 'Tax');
        cy.get('[data-testid=dropdown-payment]').click();
        cy.get('[data-testid=dropdown-payment]').contains('Tunai').click();
        cy.get('[data-testid=total-price]').should('contain', 'Total');
    });

    it('displays the payment confirmation', () => {
        cy.get('[data-testid=popup-lanjutkan-pembayaran]').click();
        cy.get('[data-testid=popup-lanjutkan-pembayaran]').should('be.visible');
        cy.contains('Konfirmasi Pembayaran').should('be.visible');
    });

});