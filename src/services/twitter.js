import Twitter from 'twitter-lite';

class TwitterService {
    constructor() {
        this.API_BEARER_TOKEN = process.env.TWITTER_API_BEARER_TOKEN;
        
    }
    
    async searchHandle(handle) {
        try {
            const user = new Twitter({
                consumer_key: process.env.API_KEY,
                consumer_secret: process.env.API_KEY_SECRET,
                access_token_key: process.env.ACCESS_TOKEN,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET
            });
            const response = await user.getBearerToken();
            const twitter = new Twitter({
                bearer_token: response.access_token
            }) 
            const results = await user.get("users/search", {q: handle});
            console.log(results);
            return results;
        }catch(err) {
            console.error(err);
            throw err;
        }
        
    }

}

export default TwitterService;