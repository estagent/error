import {translate} from '@revgaming/languages'

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
    return translate('messages.loading_error', {
      code: response.status,
    })
  }
  return !err
    ? translate('messages.requestTimeOut')
    : err.message ??
        (typeof err === 'string' ? err : translate('messages.failed'))
}
