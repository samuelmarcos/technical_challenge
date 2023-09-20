import { ExampleClass } from './index'


describe('Teste' , () => {
  test('Example test', () => {
    const teste = new ExampleClass()
    expect(teste.run()).toEqual(2)
  })
})
