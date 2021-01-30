class TwitterController {
    constructor(twitterService) {
        this.twitterService = twitterService;
    }

    async search(req, res) {
        try {
            const handle = req.query.search;
        const result = await this.twitterService.searchHandle(handle);
        return res.send(result);
        } catch(err) {
            return res.status(500).json({message: "An error has ocurred"});
        }
    }
}

export default TwitterController;