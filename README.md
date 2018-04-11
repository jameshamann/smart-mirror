# Smart Mirror Client App

IoT Node/React App for Smart Mirror.


var parser = new FeedMe(true);
res.pipe(parser);
parser.on('title', (title) => {
  console.log('title of feed is', title);
});
parser.on('item', (item) => {
  console.log();
  console.log('news:', item.title);
  console.log(item.description);

});
parser.on('end', () => {
  console.log(parser.done());
  return parser.done();
});

<Header style={{color: 'white', fontFamily: 'Roboto'}}>
{this.userGreeting(this.state.date.getHours())}, {this.state.currentUser}
  <p style={{fontFamily: 'Roboto'}}>Have a Great Day!</p>
</Header>
