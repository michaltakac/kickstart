SET ROOT_FOLDER=%~dp0..
cd "%ROOT_FOLDER%"
CMD /C npm install
rmdir /s/q meteor\react-build-generated

cd meteor
SET WEBPACK_CONFIG=%ROOT_FOLDER%\webpack\development.config.js
meteor --settings "%ROOT_FOLDER%\settings\development.json"
