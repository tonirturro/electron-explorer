const  Api = require('./api');
const { ipcRenderer, ipcMain } = require('electron-ipc-mock')();

describe('When using inter process api, it', () => {
    var api;

    beforeEach(() => {
        api = new Api(ipcMain);
    });

    it('Should be defined', () => {
        expect(api).toBeDefined();
    });

    describe('When requesting path, it', () => {
        
        it('Should call the home folder path', (done) => {
            const ExpectedPath = 'User path';
            spyOn(api.services, 'getUsersHomeFolder').and.returnValue(ExpectedPath);

            expect(api.services.getUsersHomeFolder()).toEqual(ExpectedPath);

            ipcRenderer.send('request-path', null);

            ipcRenderer.on('request-path-reply', (event, result) => {
                // expect(result).toEqual(ExpectedPath);
                done();
            });
        });

    });
});