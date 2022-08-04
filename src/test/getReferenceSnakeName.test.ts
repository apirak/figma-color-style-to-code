import { getReferenceSnakeName } from '../utility/styleUtility'

describe('Separete Key from Name', () => {
  // it('Separate Simple Name', () => {
  //   expect('x').toEqual('x')
  // })
  it('Separate Simple Name', () => {
    expect(getReferenceSnakeName('Large / Super')).toEqual('large_super')
    expect(getReferenceSnakeName('Large /  Super')).toEqual('large_super')
    expect(getReferenceSnakeName('Large /Super')).toEqual('large_super')
    expect(getReferenceSnakeName('Large/Super')).toEqual('large_super')
    expect(getReferenceSnakeName('XXLarge/Super')).toEqual('x_x_large_super')
  })

  it('Lower case on first name', () => {
    expect(getReferenceSnakeName('LargeName')).toEqual('large_name')
    expect(getReferenceSnakeName('LargeName/SmallName')).toEqual(
      'large_name_small_name'
    )
  })

  it('Separate Name with space', () => {
    expect(getReferenceSnakeName('Large / Super man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /  Super man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /Super man')).toEqual('large_super_man')
    expect(getReferenceSnakeName('Large/Super man')).toEqual('large_super_man')
    expect(getReferenceSnakeName('XXLarge/Super man')).toEqual(
      'x_x_large_super_man'
    )
    expect(getReferenceSnakeName('Spider man/Super man')).toEqual(
      'spider_man_super_man'
    )
    expect(getReferenceSnakeName('Spider man/Super / man')).toEqual(
      'spider_man_super_man'
    )
  })

  it('Separate two folder', () => {
    expect(getReferenceSnakeName('Large / Super / man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /  Super / man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large /Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('Large/Super /man')).toEqual('large_super_man')
    expect(getReferenceSnakeName('XXLarge/Super /  man')).toEqual(
      'x_x_large_super_man'
    )
  })

  // TODO: Try add "x / / lksdjf" style to figma and check real style name
  it('Ignore Empty Foler', () => {
    expect(getReferenceSnakeName('/Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('//Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('///Large/Super /man')).toEqual(
      'large_super_man'
    )
    expect(getReferenceSnakeName('/ /Large/Super /man')).toEqual(
      '_large_super_man'
    )
  })
})
