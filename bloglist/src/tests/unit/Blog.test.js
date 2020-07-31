import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'

import Blog from '../../components/Blog'
import testHelper from '../test_helpers'

describe('Blog', () => {
    const {singleBlog} = testHelper

    let mockHandler

    let component

    beforeEach(() => {
        mockHandler = jest.fn()

        component = render(
            <Blog blog={singleBlog} like={mockHandler} remove={mockHandler}/>
        )
    })

    test('blog renders, toggleable content hidden', () => {
        expect(component.container).toHaveTextContent(
            singleBlog.title
        )

        expect(component.container).toHaveTextContent(
            singleBlog.author
        )

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })


    test('blog renders, toggle works', () => {
        expect(component.container).toHaveTextContent(
            singleBlog.url
        )
        expect(component.container).toHaveTextContent(
            singleBlog.likes
        )

        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')

        fireEvent.click(button)
        expect(div).toHaveStyle('display: none')
    })

    test('like button works', () => {
        const button = component.getByText('Like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('remove button works', () => {
        const button = component.getByText('Remove')
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})