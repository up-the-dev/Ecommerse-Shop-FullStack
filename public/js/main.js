const logOut = async () => {
    try {
        const res = await axios({
            method: "post",
            url: '/auth/logOut',
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        return error
    }


}