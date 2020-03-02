export default value =>
  (e => e ? e.join('') : ''
  )(
    value.match(/[A-Wa-z01-9]/gi)
  )
