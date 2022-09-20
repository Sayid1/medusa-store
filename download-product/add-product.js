var axios = require('axios')
const BASE_URL = 'http://localhost:9000/admin/'

var config = {
    method: 'post',
    headers: {
        cookie: 'sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22o0bES1fjPOG6I6PTGip6z5HNmQJw%22%2C%22first_id%22%3A%22182815285507ac-017ded9951ae639-5437971-250125-18281528551c7a%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%2C%22%24latest_search_keyword%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%2C%22%24latest_referrer%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTgyODE1Mjg1NTA3YWMtMDE3ZGVkOTk1MWFlNjM5LTU0Mzc5NzEtMjUwMTI1LTE4MjgxNTI4NTUxYzdhIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoibzBiRVMxZmpQT0c2STZQVEdpcDZ6NUhObVFKdyJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22o0bES1fjPOG6I6PTGip6z5HNmQJw%22%7D%2C%22%24device_id%22%3A%22182815285507ac-017ded9951ae639-5437971-250125-18281528551c7a%22%7D; Admin-Token=eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjM0MzczOTI2LTEyOTMtNDcxNC04YzcyLTQ5ZTMzZjk3NDU3MiJ9.xNHctzK9GD4t31i-KnqBHQoCLZW_Ti7U6gmpaE2fgVSD5wEiqnlQXw5SmR2HZZR7kwBa0nlgKExtktjFuFyl1Q; Api-Token=eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE2OTFlODU4LWFlNGUtNDllYy04YTYzLTE0ZjEwNTY2ZjllMyJ9.rhXmZiLyOne6nH0BzwYfEweEQFI-N3hE5CXqu9nur63cdI75zgCuRLbbgQnzz0v46BXJ8xVckpb82qyewYG7Gg; g_state={"i_l":0}; sidebarStatus=1; connect.sid=s%3AXHq1NRtjkA3BR8KkjqPeSt1lGuAi-bIl.JLFC17IwRW2NZ%2BgEODbcyLhLJjXawayrvO4xEu3DiFQ',
        'Content-Type': 'application/json',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
    },
}

const addProduct = product => {
    return axios({
        ...config,
        url: BASE_URL + 'products',
        data: JSON.stringify(product),
    }).then(function (response) {
        return response.data.product
    })
}

const addProductPrice = (productId, variantId, payload) => {
    return axios({
        ...config,
        url: BASE_URL + 'products/' + productId + '/variants/' + variantId,
        data: JSON.stringify(payload),
    })
        .then(function (response) {
            return response.data
        })
        .catch(console.error)
}

const productRelationCollection = (productId, collectionId) => {
    return axios({
        ...config,
        url: BASE_URL + 'product-collection-relation/extender/add',
        data: JSON.stringify({
            productId,
            collectionId,
        }),
    }).then(function (response) {
        return response.data.product
    })
}

module.exports = {
    addProduct,
    addProductPrice,
    productRelationCollection,
}
