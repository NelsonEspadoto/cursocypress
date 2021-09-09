it('sem testes', () => {})

// const getSomething = callback => {
//     setTimeout(() => {
//         callback(12)
//     }, 1000)
// }

// const system = () => {
//     console.log('init');
//     getSomething(some => console.log(`Something is ${some}`))
//     console.log('end');
// }

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13)
        }, 1000)
    })
}

const system = () => {
    console.log('init');
    getSomething().then(some => console.log(`Something is ${some}`))
    console.log('end');
}

system()