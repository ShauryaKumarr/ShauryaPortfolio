from time import sleep
from usbiss.spi import SPI
import opcng as opc
import datetime 
import sys

try:
    spi = SPI("/dev/ttyACM0")
except:
    spi = SPI("/dev/ttyACM1")
spi.mode = 1
spi.max_speed_hz = 500000
spi.lsbfirst = False


# autodetect device



dev = opc.detect(spi)

# power on fan and laser
dev.on()
sleep(1)
file_path = f'{datetime.datetime.now()} datafile.txt'

for i in range(60):
    # query particle mass readings
    hist = dev.histogram()
    del hist["#RejectLongTOF"]
    del hist["#RejectGlitch"]
    del hist["#RejectRatio"]
    del hist["#RejectOutOfRange"]
    del hist["Fan rev count"]
    del hist["Laser status"]
    del hist["Checksum"]
    del hist["SFR"]
    del hist["Bin1 MToF"]
    del hist["Bin3 MToF"]
    del hist["Bin5 MToF"]
    del hist["Bin7 MToF"]
    del hist["Sampling Period"]
    del hist["Temperature"]
    del hist["Relative humidity"]
    #histogram not printed in shell but directly into file
    print("\n")
    e = datetime.datetime.now()
    sys.stdout = open(file_path, 'a')
    print("*")
    print("%s" % e)
    print(hist)
    #file print, first dataset time is name of file
    
    #rate of readings
    sleep(1)







# power off fan and laser
dev.off()
 