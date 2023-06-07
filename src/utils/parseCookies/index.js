const parseCookies = cookies =>
{
    const list = {}

    if(!cookies) return list

    cookies.split(`;`).forEach(function(cookie)
    {
        let [name, ...rest] = cookie.split(`=`)

        name = name?.trim()
        if(!name) return

        const value = rest.join(`=`).trim()
        if(!value) return

        list[name] = decodeURIComponent(value)
    })

    return list
}

module.exports = parseCookies