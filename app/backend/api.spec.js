const Api = require('./api');
const { ipcRenderer, ipcMain } = require('electron-ipc-mock')();

describe('When using inter process api, it', () => {
    var api;

    beforeEach(() => {
        api = new Api(ipcMain);
    });

    it('Should be defined', () => {
        expect(api).toBeDefined();
    });

    it('Should return home folder path', (done) => {
        const Request = 'request-path';
        const ExpectedPath = 'User path';
        spyOn(api.services, 'getUsersHomeFolder').and.returnValue(ExpectedPath);

        ipcRenderer.send(Request, null);

        ipcRenderer.on(Request + '-reply', (event, result) => {
            if (result === ExpectedPath) {
                done();
            }
        });
    });

    it ('Should return files in folder', () => {
        const Request = 'request-files';
        const Path = 'user path';
        const ExpectedFiles = [];

        spyOn(api.services, 'getFilesInFolder').and.callFake((path, callBack) => {
            expect(path).toEqual(Path);
        });

        api.services.getFilesInFolder(Path, (err, files) => {
            var result;
            if (err) {
                result = null;
            } else {
                result = files;
            }
        });

        ipcRenderer.send(Request, Path);
    });
});