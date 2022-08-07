export default err => {
  let response, data
  if (err.responseJSON || err.responseText) {
    // isjQueryAjax
    response = err
    data = err.responseJSON || err.responseText
  } else {
    response = err.response
    data = response?.data
  }
  if (response && data) {
    return (
      data.error ||
      data.message ||
      (typeof data === 'string' ? data : response.statusText)
    )
  } else if (response) {
    return `Http Error [${response.status}]`
  }
  return !err
    ? 'Timeout Error'
    : err.message ?? (typeof err === 'string' ? err : 'error')
}
