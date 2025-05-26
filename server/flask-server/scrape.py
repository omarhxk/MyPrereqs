from bs4 import BeautifulSoup
import requests
import re

url = "https://utsc.calendar.utoronto.ca/course/cscb09h3"


def getCourseCodeFormat(code):
    match = re.fullmatch(r'([A-Za-z]*)(\d*)([A-Za-z]*)(\d*)', code)
    if match:
        part1, num1, part2, num2 = match.groups()
        return [len(part1), len(num1), len(part2), len(num2)]
    else:
        raise ValueError("Course code doesn't match expected format.")


def isCourseCode(text, courseCodeFormat):
    numLetters1 = courseCodeFormat[0]
    numDigits1 = courseCodeFormat[1]
    numLetters2 = courseCodeFormat[2]
    numDigits2 = courseCodeFormat[3]

    length = numLetters1 + numDigits1 + numLetters2 + numDigits2
    if len(text) != length:
        return False
    
    seg1 = text[0:numLetters1]
    if not seg1.isalpha():
        return False
    
    seg2 = text[numLetters1:numLetters1 + numDigits1]
    if not seg2.isdigit():
        return False
    
    seg3 = text[numLetters1 + numDigits1: numLetters1 + numDigits1 + numLetters2]
    if not seg1.isalpha():
        return False
    
    seg4 = text[numLetters1 + numDigits1 + numLetters2]
    if not seg2.isdigit():
        return False
        
    return True


def getPrereqs(url, courseCodeFormat):
    preReqs = []
    page = requests.get(url)
    page.raise_for_status() #in case of error

    soup = BeautifulSoup(page.text, "html.parser")
    text = soup.get_text(separator=' ', strip=True)

    startInd = text.lower().find("prerequisite")

    if startInd == -1:
        return [""]
    
    endInd = -1
    stopWords = ["antirequisite", "exclusion", "breadth requirement"]
    for word in stopWords:
        endIndCandidate = text.lower().find(word)
        if endInd == -1 or endIndCandidate < endInd:
            endInd = endIndCandidate
    
    if endInd != -1:
        text = text[startInd:endInd]

    
    words = text.split()
    for word in words:
        cleanedWord = word.strip("()[]/")
        if isCourseCode(cleanedWord, courseCodeFormat):
            preReqs.append(cleanedWord)
    
    return preReqs




 


