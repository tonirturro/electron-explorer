const Api = require('./api');
const Services = require('./services');
const ElectronMock = require('../../test/electronMock');

describe('When using inter process api, it', () => {
    const ExpectedPath = 'User path';
    const ExpectedFiles = [ 'file1', 'file2' ];
    var api, services, ipcMain, ipcRenderer;

    beforeEach(() => {
        var electronMock = new ElectronMock();
        ipcMain = electronMock.ipcMain;
        ipcRenderer = electronMock.ipcRenderer;
        services = new Services();
    });

    it('Should return home folder path', (done) => {
        const Request = 'request-path';
        spyOn(services, 'getUsersHomeFolder').and.returnValue(ExpectedPath);
        api = new Api(ipcMain, services);

        ipcRenderer.on(Request + '-reply', (event, result) => {
            expect(result).toEqual(ExpectedPath);
            done();
        });

        ipcRenderer.send(Request, null);
    });

    it ('Should return files in folder', (done) => {
        const Request = 'request-files';
        const ExpectedFiles = [];
        spyOn(services, 'getFilesInFolder').and.callFake((path, callBack) => {
            expect(path).toEqual(ExpectedPath);
            callBack(false, ExpectedFiles)
        });
        api = new Api(ipcMain, services);

        ipcRenderer.on(Request + '-reply', (event, result) => {
            expect(result).toEqual(ExpectedFiles);
            done();
        });

        ipcRenderer.send(Request, ExpectedPath);
    });

    it ('Should return file info for files', () => {
        const Request = 'inspect-files';
        const ExpectedFileInfo = [ { type: 'file' }, { type: 'folder' }];
        spyOn(services, 'inspectAndDescribeFiles').and.callFake((path, files, callBack) => {
            expect(path).toEqual(ExpectedPath);
            expect(files).toEqual(ExpectedFiles);
            callBack(false, ExpectedFileInfo)
        });

        ipcRenderer.on(Request + '-reply', (event, result) => {
            expect(result).toEqual(ExpectedFileInfo);
            done();
        });

        ipcRenderer.send(Request, ExpectedPath, ExpectedFiles);
    });
});