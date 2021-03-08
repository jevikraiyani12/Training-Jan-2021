USE AdventureWorks2012

SELECT ASCII('A')
SELECT ASCII('a')
SELECT CHAR(65)
SELECT CHAR(97)

SElECT CHARINDEX('I','JEVIK RAIYANI')
SElECT CHARINDEX('i','JEVIK RAIYANI')
SElECT CHARINDEX('I','JEVIK RAIYANI',5)
SElECT CHARINDEX('I','JEVIK RAIYANI',10)

SELECT CONCAT('Jevik' ,'Raiyani')
SELECT CONCAT('Jevik ' ,'P.',' Raiyani')

DECLARE @abc DATETIME = '01/01/2012'
SELECT FORMAT(@abc, 'd')	
DECLARE @abc DATETIME = '01/01/2012'
SELECT FORMAT(@abc, 'm')	
DECLARE @abc DATETIME = '01/01/2012'
SELECT FORMAT(@abc, 'y')	
DECLARE @abc DATETIME = '01/01/2012'
SELECT FORMAT(@abc, '')
DECLARE @abc DATETIME = '01/01/2012'
SELECT FORMAT(@abc, '', 'en-US')	
DECLARE @abc DATETIME = '01/01/2012'
SELECT FORMAT(@abc, '', 'en-IN')	

SELECT LEFT('jevik',3)
SELECT LEFT('jevik raiyani',3)
SELECT RIGHT('jeivikk',3)
SELECT RIGHT('jevik RAIYANI',3)

SELECT LEN('JEVIK')
SELECT LEN('JEVIK Raiyani')
SELECT LEN('JEVIK Raiyani''jevol')
SELECT LEN('JEVIK Raiyani hello world')

SELECT LOWER('JeVIK')
SELECT UPPER('jeivk') , LOWER('JEvIk')

SELECT LTRIM('   jeivk  RAIyANI  ')
SELECt RTRIM('   jeivk  RAIyANI  ')
SELECT TRIM('    JEVIK RAIYANI   ')

SELECT PATINDEX('%ik%','jevik_raiyani')
SELECT PATINDEX('%ik','jevik_raiyani')
SELECT PATINDEX('%ik','jevik_raiyanik')
SELECT PATINDEX('%a%','jevik_raiyani')
SELECT PATINDEX('%an%','jevik_raiyani')
SELECT PATINDEX('%[e-i]%','jevik_raiyani')
SELECT PATINDEX('%[e-i]%','j0vik_raiyani')

SELECT REPLACE('JEVIK RAIYANI','JEVIK','BHAVIK')
SELECT REPLACE('JEVIK RAIYANI',' ',' P. ')

SELECT SOUNDEX('hellofriends')
SELECT SOUNDEX('helo')
SELECT SOUNDEX('ahelo')
SELECT SOUNDEX('nope')
SELECT SOUNDEX('hello'), SOUNDEX('helo')
SELECT SOUNDEX('hello'), SOUNDEX('helao')
SELECT SOUNDEX('hello'), SOUNDEX('aheloo')
SELECT DIFFERENCE('hello','helao')
 
SELECT SPACE(2)

USE Jevik
SELECT * FROM Employees

SELECT FirstName+LastName 'NAME' FROM Employees
SELECT FirstName+ SPACE(1)+LastName 'NAME' FROM Employees
SELECT RTRIM( FirstName)+ SPACE(1)+LTRIM( LastName) 'NAME' FROM Employees

SELECT STR(12)	
SELECT STR(12.1)
SELECT STR(12.1)+1
SELECT STR(12.71)
SELECT STR(12.71)+'1'
SELECT STR(123.45,6,1)	
SELECT STR(123.454545,6,2)	
SELECT STR(123.454545,7,3)	
SELECT STR(123.456454,6,2)	
SELECT STR(123.456454,5,2)	
SELECT STR(123.456454,4,2)	
SELECT STR(123.456454,2,2)
SELECT STR(123.456454,5,0)
SELECT STR(123.456454,5)	

SELECT STUFF('abc',2,1,'d')
SELECT STUFF('JEVIK RAIYANI',1,5,'BHAVIK')
SELECT STUFF('JEVIK RAIYANI',7,7,'BHAVIK')
SELECT STUFF('JEVIK RAIYANI',7,0,'BHAVIK ')
SELECT STUFF('JEVIK RAIYANI',1,0,'BHAVIK ')
SELECT STUFF('JEVIK RAIYANI',13,0,' BHAVIK')
SELECT STUFF('JEVIK RAIYANI',1,2,'BHA')
SELECT STUFF('JEVIK RAIYANI',1,13,'BHAVIK')
SELECT STUFF('JEVIK RAIYANI',7,7500,'BHAVIK')
SELECT STUFF('JEVIK RAIYANI',7,LEN('RAIYANI'),'BHAVIK')
SELECT STUFF('JEVIK RAIYANI',1,25,'BHAVIK')

SELECT SUBSTRING('JEVIK RAIYANI',1,5)
SELECT SUBSTRING('JEVIK RAIYANI',4,5)
SELECT SUBSTRING('JEVIK RAIYANI',8,5)
SELECT SUBSTRING('JEVIK RAIYANI',5,0)
SELECT SUBSTRING('JEVIK RAIYANI',6,LEN('JEVIK RAIYANI'))
SELECT SUBSTRING('JEVIK RAIYANI',8,50)


SELECT TRANSLATE('JEVIK RAIYANI JEVIK RAIYANI','AAVIK','BHAVI')
SELECT TRANSLATE('atob','ab','cd')
SELECT TRANSLATE('aaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbccccc','abc','xyz')
SELECT TRANSLATE('aaaaaaaabbbbbbbbbcccccaaaaabbbbbccccc','abc','123')
SELECT TRANSLATE('aabbcc','a','2')
SELECT TRANSLATE('(jevik) (raiyani)','()',')(')
SELECT TRANSLATE('(jevik) (raiyani)','()','[]')
SELECT TRANSLATE('(jevik) (raiyani)','()','{}')
SELECT TRANSLATE('(jevik) (raiyani)','()','[}')
SELECT TRANSLATE('(jevik) (raiyani)','()','  ')
SELECT TRANSLATE('(jevik) (raiyani)','()','= ')
SELECT TRANSLATE('(jevik) (raiyani)','()','> ')

SELECT UNICODE ('jevik')
SELECT UNICODE ('Aevik')
SELECT UNICODE ('0jevik')

SELECT REPLICATE('jevik',2)
SELECT REPLICATE('jevik',5)
SELECT REPLICATE('0',2)
SELECT REPLICATE('01',2)
SELECT REPLICATE('010',2)
SELECT REPLICATE('01010 ',3)
SELECT * FROM Employees

SELECT REPLICATE('#',5)+LTRIM( STR(DepartmentID) )AS 'NEW' FROM Employees
SELECT REPLICATE('$',1)+LTRIM( STR(Salary/70,10,2) )AS 'NEW' FROM Employees
 
SELECT REVERSE('JEvik RaiYANI')
SELECT LOWER( REVERSE('JEvik RaiYANI'))

--date
SELECT GETDATE()

SELECT DAY('12-2-1999')
SELECT MONTH('12-2-1999')
SELECT YEAR('12-2-1999')

SELECT DATEADD(MM,3,GETDATE())
SELECT DATEADD(MM,3,'2-12-1999')
SELECT DATEADD(YYYY,3,GETDATE())
SELECT DATEADD(YYYY,3,'12-12-1999')

SELECT DATENAME(MM, '12-12-1985')
SELECT DATENAME(YYYY, '12-12-1985')
SELECT DATENAME(DAY, '12-12-1985')
SELECT DATENAME(WEEKDAY, '12-12-1985')
SELECT DATENAME(MM,CONVERT(datetime,'12-12-1999'))

SELECT * FROM HumanResources.Employee

SELECT DATENAME(MM, HireDate) +','+CONVERT(varchar,  DATEPART(YYYY, HireDate)) 
FROM HumanResources.Employee

SELECT DATENAME(MM, GETDATE())+' '+ CONVERT(varchar, DATEPART(DD, GETDATE())) +' '
+CONVERT(varchar,  DATEPART(YYYY,GETDATE()))

SELECT CAST(DATEPART(yyyy,GETDATE()) AS  varchar)

SELECT DATENAME(MM, GETDATE())+' '+ CONVERT(varchar, DATEPART(DD, GETDATE())) +' '
+CAST(DATEPART(yyyy,GETDATE()) AS  varchar)


SELECT LoginID , BirthDate FROM HumanResources.Employee
WHERE BirthDate<='1970-01-10' AND BirthDate>= '1960-01-1'

SELECT LoginID , BirthDate, DATEDIFF(YEAR,BirthDate,GETDATE()) 'AGE' FROM HumanResources.Employee




MATHematical

SELECT CEILING(14.4)
SELECT FLOOR(14.4)
SELECT EXP(4.5)
SELECT EXP(0)
SELECT POWER(2,3)
SELECT POWER(2.3,3.1)
SELECT ROUND(14.4545684,2)

SELECT ISNULL(location, 'not available') FROM  dbo.JobHistory
SELECT  COALESCE(location, 'not available') FROM  dbo.JobHistory

SELECT EOMONTH(GETDATE())

SELECT CHARINDEX('rai','jevik raiyani')
SELECT PATINDEX('%rai%','jevik raiyani')


SELECT CHOOSE(1,FirstName,LastName,FirstName+' '+LastName) 'Name' FROM Employees
SELECT CHOOSE(2,FirstName,LastName,FirstName+' '+LastName) 'Name' FROM Employees
SELECT CHOOSE(3,FirstName,LastName,FirstName+' '+LastName) 'Name' FROM Employees

SELECT IIF(DepartmentID>65, 'COM','IT') AS 'if true then com else it' FROM Employees

SELECT * FROM Employees