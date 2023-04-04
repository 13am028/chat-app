import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import UserSetting from '../UserSetting'

describe('UserSettingPage', () => {
    it('renders the left/right panel', () => {
        render(
            <BrowserRouter>
                <UserSetting />
            </BrowserRouter>,
        )
        const leftPanel = screen.getByTestId('left-panel')
        expect(leftPanel).toBeInTheDocument()
        const rightPanel = screen.getByTestId('right-panel')
        expect(rightPanel).toBeInTheDocument()
    })

    it('renders the profile setting when the profile link is clicked', () => {
        render(
            <BrowserRouter>
                <UserSetting />
            </BrowserRouter>,
        )
        const profileLink = screen.getByTestId('profile-link')
        fireEvent.click(profileLink)
        const profileSetting = screen.getByTestId('profile-setting')
        expect(profileSetting).toBeInTheDocument()
    })

    it('renders the close button', () => {
        render(
            <BrowserRouter>
                <UserSetting />
            </BrowserRouter>,
        )
        const closeButton = screen.getByTestId('close-button')
        expect(closeButton).toBeInTheDocument()
    })

    it('click all tabs', () => {
        render(
            <BrowserRouter>
                <UserSetting />
            </BrowserRouter>,
        )
        const profileLink = screen.getByTestId('profile-link')
        fireEvent.click(profileLink)
        const privacyLink = screen.getByTestId('privacy-link')
        fireEvent.click(privacyLink)
        const friendRequestLink = screen.getByTestId('friend-request-link')
        fireEvent.click(friendRequestLink)
        const appearanceLink = screen.getByTestId('appearance-link')
        fireEvent.click(appearanceLink)
        const accessibilityLink = screen.getByTestId('accessibility-link')
        fireEvent.click(accessibilityLink)
        const voiceVideoLink = screen.getByTestId('voice-video-link')
        fireEvent.click(voiceVideoLink)
        const textImageLink = screen.getByTestId('text-image-link')
        fireEvent.click(textImageLink)
        const notificationLink = screen.getByTestId('notification-link')
        fireEvent.click(notificationLink)
        const languageLink = screen.getByTestId('language-link')
        fireEvent.click(languageLink)
        const activityPrivacyLink = screen.getByTestId('activity-privacy-link')
        fireEvent.click(activityPrivacyLink)
        const registeredGameLink = screen.getByTestId('registered-game-link')
        fireEvent.click(registeredGameLink)
        const logoutLink = screen.getByTestId('logout-link')
        fireEvent.click(logoutLink)
    })
})
