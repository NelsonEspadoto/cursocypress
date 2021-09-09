/// <reference types="cypress" />

it('Equality', () => {
    const a = 1

    expect(a).equal(1)
    expect(a, 'Deveria ser 1').equal(1)
    expect(a).to.be.equal(1)
    expect('a').not.to.be.equal('b')
});

it('Truthy', () => {
    const a = true
    const b = null
    let c;

    expect(a).to.be.true
    expect(true).to.be.true
    expect(b).to.be.null
    expect(a).to.be.not.null
    expect(c).to.be.undefined
});

it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.eq(obj)
    expect(obj).to.be.deep.eq({ a: 1, b: 2})
    expect(obj).eql({ a: 1, b: 2})
    expect(obj).include({ a: 1})
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2)
    expect(obj).to.not.be.empty
});

it('Arrays', () => {
    const arr = [1, 2, 3]

    expect(arr).to.have.members([1, 2, 3])
    expect(arr).to.include.members([1, 3])
    expect(arr).to.be.not.empty
    expect([]).to.be.empty
});

it('Types', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('Object')
    expect([]).to.be.an('array')
});

it('String', () => {
    const str = "String de Teste"

    expect(str).to.be.eq('String de Teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')
    expect(str).to.match(/de/)
    expect(str).to.match(/^String/)
    expect(str).to.match(/Teste$/)
    expect(str).to.match(/.{15}/)
    expect(str).to.match(/\w+/)
    expect(str).to.match(/\D+/)
});

it('Numbers', () => {
    const number = 4
    const floatNumber = 5.13

    expect(number).to.be.eq(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(5)
    expect(floatNumber).to.be.eq(5.13)
    expect(floatNumber).to.be.closeTo(5.1, 0.1)
    expect(floatNumber).to.be.above(5)
});
