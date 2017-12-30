'use strict';

const async = require('async');
const osenv = require('osenv');
const fs = require('fs');
const path = require('path');

/**
 * Encapsulates the system calls
 */
module.exports = class Services {

    /**
     * Gets the users home folder
     */
    getUsersHomeFolder() {
        return osenv.home();
    }

    /**
     * Get the files for a particular folder
     * @param { the path to read the files from } folderPath 
     * @param { the callback to receive the result } cb 
     */
    getFilesInFolder(folderPath, cb) {
        fs.readdir(folderPath, cb);
    }

    /**
     * Distinguish between files and directories for the files in a folder
     * @param { the path where the files are } folderPath 
     * @param { the files to be inspected } files 
     * @param { the callback to report the result } cb 
     */
    inspectAndDescribeFiles(folderPath, files, cb) {
        // Uses async module to call asynchronous functions and collects
        // results together
        async.map(files, (file, asyncCb) => {
            let resolvedFilePath = path.resolve(folderPath, file);
            inspectAndDescribeFile(resolvedFilePath, asyncCb);
        }, cb);
    }

}

/**
 * Distinguish between files and directories
 * @param {the file path to inspect} filePath 
 * @param {the callback to return the result} cb 
 */
function inspectAndDescribeFile(filePath, cb) {
    let result = {
        fileName: path.basename(filePath),
        path: filePath,
        type: ''
    }
    // fs.stat call supplies an object you can query to find out
    // file's type
    fs.stat(filePath, (err, stat) => {
        if (err) {
            cb(err);
        } else {
            if (stat.isFile()) {
                result.type = 'file';
            }
            if (stat.isDirectory()) {
                result.type = 'folder'
            }
            cb(err, result);
        }
    });
}
