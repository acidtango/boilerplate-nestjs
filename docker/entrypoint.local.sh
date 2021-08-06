#!/bin/sh

echo "*** WAITING FOR DB TO BE READY ***"
PORT="${DB_PORT:-5432}"
./wait-for.sh -t 0 $DB_HOST:$PORT

exitCode=$?
if [ $exitCode -ne 0 ] ; then
  exit $exitCode
fi

echo "*** RUNNING MIGRATIONS ***"
yarn migration:run

exitCode=$?
if [ $exitCode -ne 0 ] ; then
  exit $exitCode
fi

echo "*** STARTING SERVICE ***"
yarn start:dev
