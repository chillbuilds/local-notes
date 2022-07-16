# local notes

Electron app to create, edit, tag, and delete local text files

# built with
* nodejs
* electron
* fs

# how to deploy

locally:
npm i
npm start

mac app generation (creates app in repo directory):
npm i
npx electron-packager . "local notes" --icon ./public/assets/images/note.icns

# to do
* move note directory update to modal with "settings" button
* sort by name or date
* add note summary to note tab
* tagging
* s3 note backup