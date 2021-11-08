
FROM python

RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

ENV APP_HOME /consumer-python

WORKDIR $APP_HOME

ADD . .

RUN pip install -r requirements.txt

CMD [ "python3", "-u", "main.py" ]