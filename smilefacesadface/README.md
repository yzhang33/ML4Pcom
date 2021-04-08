# Smile or Sad
Teachable machine is good at classifying images so I had this idea to classify thumbs up and down. When the thumb is up smiley face will be turned and a sad face will turn if thumbs down. This is a simple idea that could be achieved using a servo.

## Training Data 

It's just many pictures of myself thumbs up and down. I also trained some background class. The training process is easy and fast. 

## P5 and Arduino

This is a simple program. P5 will send integer 1 as thumbs up and integer 2 as thumbs down. 

Arduino part is a simple servo that will turn 180 degrees if the received incoming byte is 1 and it will turn back to 0 if the incoming byte is 2. 

[video](https://youtu.be/wp6AZRtZ5ng)