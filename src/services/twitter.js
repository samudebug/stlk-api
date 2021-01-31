import TwitterV2 from 'twitter-v2';
import Twitter from 'twitter';

class TwitterService {
    constructor(messagingService) {
        this.messaging = messagingService;
    }
    
    async searchHandle(handle) {
        try {
            const user = new Twitter({
                consumer_key: process.env.API_KEY,
                consumer_secret: process.env.API_KEY_SECRET,
                access_token_key: process.env.ACCESS_TOKEN,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET
            });
            const results = await user.get("users/search", {q: handle});
            return results;
        }catch(err) {
            console.error(err);
            throw err;
        }
        
    }

    async addTwitterRule(handle) {
        try {
            const ruleTag = `${handle} notify`;
            const user = new TwitterV2({
                consumer_key: process.env.API_KEY,
                consumer_secret: process.env.API_KEY_SECRET,
          
                
            
            });
            let currentRules = await user.get('tweets/search/stream/rules');
            
            if (currentRules.data && currentRules.data.some((e) => e.tag === ruleTag)) {
                console.log('Rule already exists');
            } else {
                const newRule = await user.post('tweets/search/stream/rules', {
                    add: [
                        {tag: `${handle} notify`,
                        value: `from:${handle} -is:reply -is:retweet -is:quote`}
                    ]
                });

            }

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async startStream() {
        const user = new TwitterV2({
            consumer_key: process.env.API_KEY,
            consumer_secret: process.env.API_KEY_SECRET,
        });

        let stream = user.stream('tweets/search/stream', {expansions: "author_id"});
        stream.close();
        stream = user.stream('tweets/search/stream', {expansions: "author_id"});
        
        for await (const { data } of stream) {
            console.log(data);
            const user = await user.get(`users/${data.author_id}`)
            this.messaging.notifyUsers("twitter", user.data.username);
        }

        stream.close();
    }

}

export default TwitterService;