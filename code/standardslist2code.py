f = open('standards.csv','r')
i = 0
template = "<p style=\"font-size:18px;\"><h2>STANDARD</h2></p>\n<p style=\"font-size:20px;\">Python</p>\n<p style=\"font-size:18px;\">Coming soon!</p>\n<p style=\"font-size:20px;\">Java</p>\n<p style=\"font-size:18px;\">Coming soon!</p>\n<p style=\"font-size:20px;\">C/C++</p>\n<p style=\"font-size:18px;\">Coming soon!</p>\n<p style=\"font-size:20px;\">NodeJS</p>\n<p style=\"font-size:18px;\">Coming soon!</p>\n"
for line in f:
    i = i + 1
    token = line.replace("\n","")
    print(template.replace("STANDARD",token))
