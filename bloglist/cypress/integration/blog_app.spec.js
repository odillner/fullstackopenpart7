describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3004/api/testing/reset')

        const user = {
            username: 'username1',
            password: 'password1'
        }

        cy.request('POST', 'http://localhost:3004/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Bloglist')
    })

    it('login form is shown', function() {
        cy.get('#username-input')
        cy.get('#password-input')
        cy.get('#login-button')
    })

    it('user can login', function () {
        cy.get('#username-input').type('username1')
        cy.get('#password-input').type('password1')
        cy.get('#login-button').click()

        cy.contains('Successfully logged in')
    })

    it('user login fails with wrong password', function () {
        cy.get('#username-input').type('username1')
        cy.get('#password-input').type('asdf')
        cy.get('#login-button').click()

        cy.contains('Failed to log in, password or username incorrect')
    })

    describe('when logged in', function () {
        beforeEach(function() {
            cy.get('#username-input').type('username1')
            cy.get('#password-input').type('password1')
            cy.get('#login-button').click()
        })

        it('user can logout', function () {
            cy.get('#logout-button').click()

            cy.contains('Successfully logged out')
        })

        it('a new blog can be created', function () {
            cy.contains('Create new blog').click()
            cy.get('#title-input').type('cypresscreatedblog')
            cy.get('#author-input').type('cypresscreatedblog')
            cy.get('#url-input').type('cypresscreatedblog')
            cy.get('#new-blog-button').click()

            cy.contains('Blog successfully created')
            cy.contains('Show blogs').click()
            cy.contains('cypresscreatedblog')
        })

        describe('blog exists', function () {
            beforeEach(function() {
                cy.contains('Create new blog').click()
                cy.get('#title-input').type('cypressblog')
                cy.get('#author-input').type('cypressblog')
                cy.get('#url-input').type('cypressblog')
                cy.get('#new-blog-button').click()
                cy.contains('Show blogs').click()
            })

            it('blog can be expanded and hidden', function () {
                cy.contains('cypressblog')
                    .parent().contains('view').click()
                cy.contains('cypressblog')
                    .parent().contains('hide')
                cy.contains('cypressblog')
                    .parent().contains('hide').click()
                cy.contains('cypressblog')
                    .parent().contains('view')
            })

            describe('blog expanded', function () {
                beforeEach(function() {
                    cy.contains('cypressblog')
                        .parent().contains('view').click()
                })

                it('blog can be liked', function () {
                    cy.contains('cypressblog')
                        .parent().contains('Like').click()
                    cy.contains('cypressblog')
                        .parent().contains('likes: 1')
                })

                it('blog can be deleted', function () {
                    cy.contains('cypressblog')
                        .parent().contains('Remove').click()
                    cy.contains('Blog successfully deleted')
                })
            })
        })

        describe('several blogs exists', function () {
            beforeEach(function() {
                cy.contains('Create new blog').click()
                cy.get('#title-input').type('cypressblog1')
                cy.get('#author-input').type('cypressblog1')
                cy.get('#url-input').type('cypressblog1')
                cy.get('#new-blog-button').click()

                cy.contains('Create new blog').click()
                cy.get('#title-input').type('cypressblog2')
                cy.get('#author-input').type('cypressblog2')
                cy.get('#url-input').type('cypressblog2')
                cy.get('#new-blog-button').click()

                cy.contains('Create new blog').click()
                cy.get('#title-input').type('cypressblog3')
                cy.get('#author-input').type('cypressblog3')
                cy.get('#url-input').type('cypressblog3')
                cy.get('#new-blog-button').click()

                cy.contains('Show blogs').click()

                cy.contains('cypressblog1')
                    .parent().contains('view').click()
                cy.contains('cypressblog1')
                    .parent().contains('Like').click()
                cy.contains('cypressblog1')
                    .parent().contains('Like').click()

                cy.contains('cypressblog2')
                    .parent().contains('view').click()
                cy.contains('cypressblog2')
                    .parent().contains('Like').click()

                cy.contains('cypressblog3')
                    .parent().contains('view').click()
            })

            it('blogs are sorted by likes', function () {
                /* horrendous code please look away */
                cy.get('.blog')
                    .get('.likes')
                    .then(likesElem => {
                        let likes = [likesElem.length]

                        for (let i=0;i<likesElem.length;i++) {
                            likes[i] = Number(likesElem[i].childNodes[1].nodeValue)
                        }

                        const sortedLikes = likes.sort((a,b) => b.likes - a.likes)

                        /* since likes is sorted in the order the blogs appear,
                        you can simply compare the array to a sorted array and find out
                        if the blog elements are sorted correctly */

                        expect(likes).to.equal(sortedLikes)
                    })
            })
        })
    })

})