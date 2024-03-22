import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '@/app/login/page'

describe('Login page', () => {
    it('should render login page', () => {
        render(<LoginPage />)
        expect(screen.getByText('MASUK')).toBeInTheDocument()
    })

    it('should display error message for invalid email', () => {
        render(<LoginPage />)
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Kata Sandiaga')
        const submitButton = screen.getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(submitButton)

    })

    it('should submit form and redirect on successful login', async () => {
        render(<LoginPage />)
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Kata Sandiaga')
        const submitButton = screen.getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(submitButton)

        jest.mock('axios', () => ({
            post: jest.fn(() => Promise.resolve({ status: 200 })),
        }))

    })
})