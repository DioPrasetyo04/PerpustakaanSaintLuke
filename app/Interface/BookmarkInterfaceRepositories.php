<?php

interface BookmarkInterfaceRepositories
{
    public function store($request);
    public function destroy($id);
}
