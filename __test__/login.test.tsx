import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import axios from 'axios'

describe('Login page', () => {
    it('should render login page', () => {
        render(<LoginPage />)
        expect(screen.getByText('MASUK')).toBeInTheDocument()
    })

    it('should display error message for invalid email', () => {
        render(<LoginPage />)
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Kata Sandi')
        const submitButton = screen.getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(submitButton)

    })

    it('should submit form and redirect on successful login', async () => {
        render(<LoginPage />)
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Kata Sandi')
        const submitButton = screen.getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(submitButton)

        jest.mock('axios', () => ({
            post: jest.fn(() => Promise.resolve({ status: 200 })),
        }))

    })

    it('should display error message for blank email and password', () => {
        render(<LoginPage />)
        const submitButton = screen.getByText('Login')

        fireEvent.click(submitButton)
        expect(screen.getByText('Please enter your email')).toBeInTheDocument()
        expect(screen.getByText('Please enter your password')).toBeInTheDocument()
    })
    
    it('should display error message for invalid email', () => {
        render(<LoginPage />)
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Kata Sandi')
        const submitButton = screen.getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'invalid@email' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(submitButton)

        expect(screen.getByText('Email is not valid')).toBeInTheDocument()
    })
    
    it('should call axios when submit is clicked', async () => {

        const mockedAxios = axios as jest.Mocked<typeof axios>; // Create a mocked version of axios

        const fakeResponse = {
            status: 200,
            data: {
            token: 'fakeToken123',
            },
        };

        render(<LoginPage />)
        const emailInput = screen.getByLabelText('E-mail')
        const passwordInput = screen.getByLabelText('Kata Sandi')
        const submitButton = screen.getByText('Login')

        fireEvent.change(emailInput, { target: { value: 'valid@mail.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledTimes(1);
            
            expect(mockedAxios.post).toHaveBeenCalledWith(
              'http://localhost:8080/login',
              {
                email: 'valid@mail.com',
                password: 'password',
              }
            );

    })

    })

})