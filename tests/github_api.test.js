const axios = require('axios');

describe('Test GitHub public API', () => {
    describe('search', () => {
       it('can make a search', async () => {
           const res = await axios.get('https://api.github.com/search/repositories?q=hashicorp', {responseType: 'json'});
           expect(res.status).toEqual(200);
       });

        it('receives at least one search result for "hashicorp"', async () => {
            const res = await axios.get('https://api.github.com/search/repositories?q=hashicorp', {responseType: 'json'});
            expect(res.data.total_count).toBeGreaterThanOrEqual(1);
        });

        it('receives at least one search result for "hotelengine"', async () => {
            const res = await axios.get('https://api.github.com/search/repositories?q=hotelengine', {responseType: 'json'});
            expect(res.data.total_count).toBeGreaterThanOrEqual(1);
        });

        it('receives at least one search result for "typescript"', async () => {
            const res = await axios.get('https://api.githb.com/search/repositories?q=typescript', {responseType: 'json'});
            expect(res.data.total_count).toBeGreaterThanOrEqual(1);
        });

        describe('search item properties', () => {
            let response;
            let atLeastFourResults = false;

            it('returns both a "name" and a "full_name" property for each repo', async () => {
                response = await axios.get('https://api.github.com/search/repositories?q=hashicorp', {responseType: 'json'});

                expect(response.data.total_count).toBeGreaterThanOrEqual(4);
                atLeastFourResults = true;

                expect(response.data.items[1].name).toBeTruthy();
                expect(response.data.items[1].full_name).toBeTruthy();

                expect(response.data.items[2].name).toBeTruthy();
                expect(response.data.items[2].full_name).toBeTruthy();

                expect(response.data.items[3].name).toBeTruthy();
                expect(response.data.items[3].full_name).toBeTruthy();

                expect(response.data.items[4].name).toBeTruthy();
                expect(response.data.items[4].full_name).toBeTruthy();
            });

            it('should not return private repos', async () => {
                expect(response.data.items[1].private).toEqual(false);

                expect(response.data.items[2].private).toEqual(false);

                expect(response.data.items[3].private).toEqual(false);

                expect(response.data.items[4].private).toEqual(false);
            });

            it('should have a url', async () => {
                expect(response.data.items[1].url).toBeTruthy();

                expect(response.data.items[2].url).toBeTruthy();

                expect(response.data.items[3].url).toBeTruthy();

                expect(response.data.items[4].url).toBeTruthy();
            });
        })
    })
});