import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'

import NewBlog from '../../components/NewBlog'
import testHelper from '../test_helpers'

describe('Blog', () => {
    const {singleUser} = testHelper

    let mockState
    let mockDisplay

    let component

    beforeEach(() => {
        mockState = {
            user: singleUser,
            setUser: jest.fn()
        }
        mockDisplay = {
            info: jest.fn(),
            error: jest.fn()
        }

        component = render(
            <NewBlog state={mockState} display={mockDisplay}/>
        )
    })

    test('renders', () => {
        expect(component.container).toHaveTextContent('title')
        expect(component.container).toHaveTextContent('author')
        expect(component.container).toHaveTextContent('url')
    })

    test('given event handler gets called', () => {
        /* not testable as per excercise 5.16 with current implementation */
    })

})