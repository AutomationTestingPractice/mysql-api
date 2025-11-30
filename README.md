sudo /usr/local/mysql/support-files/mysql.server start

mysql -u root -p

sudo /usr/local/mysql/support-files/mysql.server stop

Export entire database mysqldump -u root -p sampledb > sampledb.sql


Export single table  mysqldump -u root -p sampledb employees > employees.sql

Export All Database  mysqldump -u root -p --all-databases > all_databases.sql

Import from mysql  SOURCE /path/to/sampledb.sql;
