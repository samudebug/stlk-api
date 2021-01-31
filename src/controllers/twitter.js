class TwitterController {
    constructor(twitterService) {
        this.twitterService = twitterService;
    }

    async search(req, res) {
        try {
            const handle = req.query.search;
        const result = await this.twitterService.searchHandle(handle);
        const formattedResult = result.map((profile) => {
            return  {
                id: profile.id_str,
                name: profile.name,
                handle: profile.screen_name,
                description: profile.description,
                profile_image_url: profile.profile_image_url_https
            }
        })
        return res.send(formattedResult);
        } catch(err) {
            return res.status(500).json({message: "An error has ocurred"});
        }
    }

    async test(req, res) {
        try {
            await this.twitterService.addTwitterRule(req.query.handle);
            res.send({message: "Rule added successfully"});
        } catch(err) {
            res.status(500).json({message: "An error has ocurred"});
        }
    }
}

export default TwitterController;