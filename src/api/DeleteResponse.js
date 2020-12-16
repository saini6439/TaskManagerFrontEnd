class BaseService {
    async deleteResponse(path,token) {
        console.log("calling delete response")
        const payload = {
            method: "DELETE",
            headers: new Headers({
                "X-Api-Key": token,
                'Content-Type': 'application/json'
            }),
        }
        let response = await fetch(path, payload);
        let data = await response.json();
        return data
    }
}

export default new BaseService();
