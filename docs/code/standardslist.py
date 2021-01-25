f = open('standards.csv','r')
i = 0
print("<ul id='featured' class='wrapper clearfix'>")
for line in f:
    i = i + 1
    outputline = "<li><img src='images/astronaut.jpg' alt='Img' height='204' width='220'><h3><a href='blog.html'>TEXT2REPLACE</a></h3></li>"
    token  = line.replace("\n","")
    print(outputline.replace("TEXT2REPLACE",token))
    if i%4==0:
        print("</ul>\n<ul id='featured' class='wrapper clearfix'>")
print("</ul>\n")
