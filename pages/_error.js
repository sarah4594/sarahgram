function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ req, res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const url = req.url
  // HACK next.js returs 404 on routes ending with /
  // even if the folder contains an index.js page
  // so redirect to url without /
  // e.g. /account/ => /account
  if (statusCode === 404 && url.endsWith('/')) {
    res.writeHead(302, {
      Location: url.slice(0, -1),
    })
    res.end()
    return
  }
  return { statusCode }
}

export default Error
