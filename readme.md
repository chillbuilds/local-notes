# local notes

electron app to create, edit, tag, and delete local text files

# built with
* nodejs
* electron
* fs

# how to deploy

locally:<br>
`npm i`<br>
`npm start`

mac app generation (creates app in repo directory):<br>
`npm i`<br>
`npx electron-packager . "local notes" --icon ./public/assets/images/note.icns`<br>

# to do
* move note directory update to modal with "settings" button
* sort by name or date (*sort)
* open first note on load
* change "save" button to "new" (auto save text after 3 secs of no textarea input)
* truncate titles
* set textarea font size
* tagging
* add local backup
* s3 note backup