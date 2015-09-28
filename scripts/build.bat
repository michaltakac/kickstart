SET ROOT_FOLDER=%~dp0..
cd %ROOT_FOLDER%
CMD /C npm install
rmdir /s/q meteor\react-build-generated

cd meteor\public\assets
for %%F in (*) do if not %%F == LEAVE_EMPTY del %%~dpnxF
cd ..\..\..

CMD /C call node_modules/.bin/webpack.cmd --config webpack\production.config.js -p

cd meteor\react-build-generated\client
for %%F in (*) do if not %%F == main.js mv %%~dpnxF %ROOT_FOLDER%\meteor\public\assets\%%F

cd ..\server
for %%F in (*) do if not %%F == main.js del %%~dpnxF

cd ..
meteor build ..